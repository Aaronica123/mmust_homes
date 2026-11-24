using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
namespace btc;


[Table("users")]
public class HomesModel:BaseModel
{
[Column("user_id")]
public int User_id{get; set;}

[Column("user_email")]
public string? User_email{get;set;}
[Column("first_name")]
public string? First_name{get;set;}
[Column("last_name")]
public string? Last_name{get;set;}

[Column("user_role")]
public string? User_role{get;set;}

}
