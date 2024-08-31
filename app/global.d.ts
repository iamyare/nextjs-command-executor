import { type Database as DB } from '@/lib/database.types'

declare global {
    type Database = DB
    type User = DB['public']['Tables']['users']['Row']
    type Command = DB['public']['Tables']['commands']['Row']
    type CommandInsert = DB['public']['Tables']['commands']['Insert']
    type CommnadUpdate = DB['public']['Tables']['commands']['Update']
    type CommandHistory = DB['public']['Tables']['command_history']['Row']
    type CommandHistoryInsert = DB['public']['Tables']['command_history']['Insert']
    type Device = DB['public']['Tables']['devices']['Row']
    type DeviceInsert = DB['public']['Tables']['devices']['Insert']
    type Token = DB['public']['Tables']['tokens']['Row']
    type TokenInsert = DB['public']['Tables']['tokens']['Insert']
    type ApiKey = DB['public']['Tables']['api_keys']['Row']

}