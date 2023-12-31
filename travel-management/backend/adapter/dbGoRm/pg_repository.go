package dbgorm

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type pgRepository struct {
	Connection *gorm.DB
}

func initPGConnection(idle int, max int) pgRepository {

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("SSL_TLS"),
		os.Getenv("TIMEZONE"),
	)

	var timeToSleep = 2 * time.Second
	var connection *gorm.DB
	for {
		var err error
		connection, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

		// Exit - Connection established
		if err == nil {
			break
		}

		// Exit - Connection establishment is not possible
		if timeToSleep.Seconds() >= 10 {
			log.Panic(err.Error())
		}

		// Failure - Retry
		if err != nil && timeToSleep.Seconds() < 10 {
			log.Println("Failed to connect to database Retry in " + string(timeToSleep.String()))
			time.Sleep(timeToSleep)
			timeToSleep = timeToSleep * 2
		}

	}

	// Connection Pool
	sqlDB, err := connection.DB()

	if err != nil {
		log.Panic("Failed to create Pool", err.Error())
	}
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(idle)

	// SetMaxOpenConns sets the maximum number of open connections to the database.
	sqlDB.SetMaxOpenConns(max)

	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	sqlDB.SetConnMaxLifetime(time.Hour)
	return pgRepository{Connection: connection}
}

func (repo pgRepository) createTable(entites ...interface{}) bool {
	err := repo.Connection.AutoMigrate(entites...)
	if err != nil {
		log.Panic("Failed to create Tables", err.Error())
		return false
	}
	return true
}
