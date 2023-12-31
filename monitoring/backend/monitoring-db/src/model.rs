use chrono::prelude::*;
use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;

use crate::schema::checkout_event;
use crate::schema::hotel_event;
use crate::schema::user_event;

#[derive(Queryable, Selectable, Debug, Deserialize, Serialize, Clone)]
#[diesel(table_name = user_event)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UserEvent {
    pub id: i32,
    pub type_: String,
    pub log: Option<String>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Insertable)]
#[diesel(table_name=user_event)]
pub struct NewUserEvent {
    pub type_: String,
    pub log: Option<String>,
    pub time: DateTime<Utc>,
}

impl NewUserEvent {
    pub fn new(type_: String, log: Option<String>, time: DateTime<Utc>) -> NewUserEvent {
        NewUserEvent { type_, log, time }
    }
}

#[derive(Queryable, Selectable, Debug, Deserialize, Serialize, Clone)]
#[diesel(table_name = checkout_event)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct CheckoutEvent {
    pub id: i32,
    pub type_: String,
    pub log: Option<String>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Insertable)]
#[diesel(table_name=checkout_event)]
pub struct NewCheckoutEvent<'a> {
    pub type_: &'a str,
    pub log: Option<&'a str>,
    pub time: &'a DateTime<Utc>,
}

impl<'a> NewCheckoutEvent<'a> {
    pub fn new(
        type_: &'a str,
        log: Option<&'a str>,
        time: &'a DateTime<Utc>,
    ) -> NewCheckoutEvent<'a> {
        NewCheckoutEvent { type_, log, time }
    }
}

#[derive(Queryable, Selectable, Debug, Deserialize, Serialize, Clone)]
#[diesel(table_name = hotel_event)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct HotelEvent {
    pub id: i32,
    pub type_: String,
    pub log: Option<String>,
    pub time: DateTime<Utc>,
}

#[derive(Debug, Insertable)]
#[diesel(table_name=hotel_event)]
pub struct NewHotelEvent<'a> {
    pub type_: &'a str,
    pub log: Option<&'a str>,
    pub time: &'a DateTime<Utc>,
}

impl<'a> NewHotelEvent<'a> {
    pub fn new(type_: &'a str, log: Option<&'a str>, time: &'a DateTime<Utc>) -> NewHotelEvent<'a> {
        NewHotelEvent { type_, log, time }
    }
}