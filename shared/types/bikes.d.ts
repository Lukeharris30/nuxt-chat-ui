export type Bike = {
  id: string
  maker: string
  family: string
  category: 'road' | 'mountain' | 'gravel' | 'hybrid' | string
  subcategory: string

  year: string
  bottom_bracket_threaded: boolean
  bottom_bracket_shell_width_mm: number
  bottom_bracket_standard: string

  frame_hanger_standard: string | null
}