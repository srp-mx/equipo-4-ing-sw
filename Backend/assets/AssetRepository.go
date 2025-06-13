package assets

import "sync"

// Global repository
var Repo *AssetRepository = nil

// Struct with all asset data
type AssetRepository struct {
	Credits      *CreditTable
	Spritesheets *SpritesheetRepo
}

// Sets up the entire asset repository
func LoadAssetRepository() error {
	res := "/resources/"
	sprites := res + "sprite_generator/"

	Repo = &AssetRepository{
		Credits:      NewCreditTable(make(map[string]Credit)),
		Spritesheets: NewSpritesheetRepo(),
	}

	err := Repo.Credits.LoadFromCsvZip(sprites+"CREDITS.csv.zip", "CREDITS.csv")
	if err != nil {
		return err
	}

	// TODO: Load spritesheets into their repo

	return nil
}

// Sets up the entire asset repository asynchronously
func LoadAssetRepositoryAsync(err *error, wg *sync.WaitGroup) {
	wg.Add(1)
	go func() {
		*err = LoadAssetRepository()
		wg.Done()
	}()
}
