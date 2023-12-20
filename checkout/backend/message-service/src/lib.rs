//! Message Service for producing messages and sending them
//!
//! Uses async kafka, so it is non blocking.
//! Uses only one broker defined in the .env file.

use std::env;
use std::time::Duration;
use dotenvy::dotenv;
use rdkafka::config::ClientConfig;
use rdkafka::producer::{FutureProducer, FutureRecord};
use serde::{Serialize};

#[derive(Serialize, Debug)]
pub struct EventMessage {
    pub event: String,
    pub data: String
}

pub struct MessageProducer {
    producer: FutureProducer
}

impl MessageProducer {
    pub fn init_message_producer(&self) {
        dotenv().ok();
        let broker = vec![env::var("KAFKA_URL").unwrap()];

        let producer = &ClientConfig::new()
            .set("bootstrap.servers", broker)
            .set("message.timeout.ms", "5000")
            .create()
            .expect("producer creation error");

        &self.producer = &producer;
    }

    async fn send_message(&self, payload: EventMessage){
        let topic = env::var("TOPIC").unwrap().as_str();
        &self.producer.send(FutureRecord::to(topic)
                                .payload(&format!("Checkout {:?}", payload)), Duration::from_secs(0)).await;
    }
}
