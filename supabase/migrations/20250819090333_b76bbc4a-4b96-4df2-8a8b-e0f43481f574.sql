-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    farm_name TEXT,
    farm_location TEXT,
    farm_size_hectares DECIMAL(10,2),
    experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
    primary_crops TEXT[],
    phone_number TEXT,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Create crops table
CREATE TABLE public.crops (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    variety TEXT,
    planted_date DATE,
    expected_harvest_date DATE,
    plot_size_hectares DECIMAL(10,2),
    status TEXT CHECK (status IN ('planted', 'growing', 'flowering', 'harvested', 'diseased')) DEFAULT 'planted',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crop analysis table
CREATE TABLE public.crop_analysis (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    image_url TEXT,
    analysis_result JSONB,
    health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
    disease_detected TEXT,
    recommendations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market prices table
CREATE TABLE public.market_prices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crop_name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_kg DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'RWF',
    market_date DATE NOT NULL DEFAULT CURRENT_DATE,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create farm tasks table
CREATE TABLE public.farm_tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    task_type TEXT CHECK (task_type IN ('planting', 'watering', 'fertilizing', 'pest_control', 'harvesting', 'other')),
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('weather', 'market', 'task', 'disease', 'general')) DEFAULT 'general',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for crops
CREATE POLICY "Users can view their own crops" ON public.crops FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own crops" ON public.crops FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own crops" ON public.crops FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own crops" ON public.crops FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for crop analysis
CREATE POLICY "Users can view their own crop analysis" ON public.crop_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own crop analysis" ON public.crop_analysis FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for market prices (public read, admin write)
CREATE POLICY "Anyone can view market prices" ON public.market_prices FOR SELECT USING (true);

-- Create RLS policies for farm tasks
CREATE POLICY "Users can view their own tasks" ON public.farm_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tasks" ON public.farm_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON public.farm_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON public.farm_tasks FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_crops_updated_at BEFORE UPDATE ON public.crops FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_farm_tasks_updated_at BEFORE UPDATE ON public.farm_tasks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create storage buckets for crop images
INSERT INTO storage.buckets (id, name, public) VALUES ('crop-images', 'crop-images', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-avatars', 'profile-avatars', true);

-- Create storage policies
CREATE POLICY "Users can upload their own crop images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'crop-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view their own crop images" ON storage.objects FOR SELECT USING (bucket_id = 'crop-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Profile avatars are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'profile-avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'profile-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert sample market data
INSERT INTO public.market_prices (crop_name, location, price_per_kg, market_date) VALUES
('Maize', 'Kigali', 280.00, CURRENT_DATE),
('Beans', 'Kigali', 450.00, CURRENT_DATE),
('Sweet Potatoes', 'Kigali', 220.00, CURRENT_DATE),
('Cassava', 'Kigali', 180.00, CURRENT_DATE),
('Tomatoes', 'Kigali', 350.00, CURRENT_DATE),
('Irish Potatoes', 'Kigali', 300.00, CURRENT_DATE);