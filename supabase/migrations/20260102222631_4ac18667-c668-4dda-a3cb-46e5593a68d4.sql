-- Table pour stocker les messages de contact
CREATE TABLE public.contact_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    objective TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_read BOOLEAN NOT NULL DEFAULT false
);

-- Activer RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique: Tout le monde peut insérer un message (formulaire public)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Politique: Personne ne peut lire les messages via l'API client
-- Les messages ne seront accessibles que via les edge functions avec service role
CREATE POLICY "No public read access"
ON public.contact_messages
FOR SELECT
USING (false);

-- Index pour améliorer les performances
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON public.contact_messages(is_read);