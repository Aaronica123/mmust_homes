namespace btc;

public class HomesService:IHomesInterface
{
    private readonly Supabase.Client client;
    
    public HomesService(Supabase.Client db)
    {
        client=db;
    }

    public async Task<List<HomesModel>> GetHomes()
    {
        var data=await client.From<HomesModel>().Get();
        return data.Models;
    }

}
