package entities

import (
	"time"

	"github.com/google/uuid"
)

type HotelEntity struct {
	ID          uuid.UUID     `json:"id" gorm:"uniqueIndex"`
	Name        string        `json:"name" gorm:"not null"`
	Address     AddressEntity `json:"adress" gorm:"not null"`
	Description string        `json:"description"`
	CreatedAt   time.Time     `json:"created" gorm:"autoCreateTime"`
	UpdatedAt   time.Time     `json:"updated" gorm:"autoUpdateTime"`
}
