package adapter

import (
	"domain/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"time"
)

// TODO: ADD .env for db config
// TODO: Verify connection pool is working
func getDB() (*gorm.DB, error) {
	dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Europe/Berlin"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Panic(err)
	}
	// Get generic database object sql.DB to use its functions
	sqlDB, err := db.DB()

	if err != nil {
		log.Panic(err)
	}
	sqlDB.SetMaxIdleConns(10)

	sqlDB.SetMaxOpenConns(100)

	sqlDB.SetConnMaxLifetime(time.Hour)
	return db, nil
}

func createUser(user model.User) (int64, error) {
	db, err := getDB()

	if err != nil {
		log.Panic("Error connecting to the database:", err)
	}

	result := db.Create(&user)
	return user.ID, result.Error

}

func updateUser(id int, user model.User) (int, error) {
	db, err := getDB()

	if err != nil {
		log.Panic("Error connecting to the database:", err)
	}
	resIsPresent := db.First(&user, id)

	if resIsPresent.Error != nil {
		return 0, resIsPresent.Error
	}

	// updates user when id is set, otherwise save -> check for id above
	result := db.Save(&user)
	if result.Error != nil {
		return 0, result.Error
	}

	return 1, nil
}

func deleteUser(id int) (int, error) {
	db, err := getDB()
	var user model.User

	if err != nil {
		log.Panic("Error connecting to the database:", err)
	}
	result := db.Delete(&user, "id = ", id)

	if result.Error != nil {
		return 0, result.Error
	}

	return 1, nil
}

func getUser(id int64) (int, error, *model.User) {
	db, err := getDB()
	var user model.User
	if err != nil {
		log.Panic("Error connecting to the database:", err)
	}
	result := db.First(&user, "id = ?", id)

	if result.Error != nil {
		return 0, result.Error, nil
	}

	if result.RowsAffected < 1 {
		return 0, result.Error, nil
	}

	return 1, nil, &user
}
