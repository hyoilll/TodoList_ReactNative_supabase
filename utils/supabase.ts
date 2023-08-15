import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {SUPABASE_URL, SUPABASE_API_KEY} from '@env';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL!, SUPABASE_API_KEY!);
