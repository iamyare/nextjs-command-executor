import { type Database as DB, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types'

declare global {
     type Database = DB
     type User = Tables<'users'>
     type Command = Tables<'commands'>
     type CommandInsert = TablesInsert<'commands'>
     type CommandUpdate = TablesUpdate<'commands'>
     type CommandHistory = Tables<'command_history'>
     type CommandHistoryInsert = TablesInsert<'command_history'>
     type Device = Tables<'devices'>
     type DeviceInsert = TablesInsert<'devices'>
     type DeviceUpdate = TablesUpdate<'devices'>
     type Token = Tables<'tokens'>
     type ApiKey = Tables<'api_keys'>
     type ApiKeyInsert = TablesInsert<'api_keys'>
     type ApiKeyUpdate = TablesUpdate<'api_keys'>

}