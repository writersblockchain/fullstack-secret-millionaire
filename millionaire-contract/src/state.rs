use std::cmp::Ordering;

use cosmwasm_std::Storage;
use cosmwasm_storage::{
    ReadonlySingleton, singleton, Singleton,
    singleton_read,
};

use serde::{Deserialize, Serialize};

const CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct State {
    pub state: ContractState,
    pub player1: Millionaire,
    pub player2: Millionaire
}

#[derive(Serialize, Deserialize, PartialEq, Clone, Debug)]
pub enum ContractState {
    Init,
    Got1,
    Done
}

impl Default for ContractState {
    fn default() -> Self {
        Self::Init
    }
}

impl From<u8> for ContractState {
    fn from(num: u8) -> Self {
        match num {
            0 => ContractState::Init,
            1 => ContractState::Got1,
            2 => ContractState::Done,
            _ => ContractState::Init
        }
    }
}

impl From<ContractState> for u8 {
    fn from(state: ContractState) -> Self {
        match state {
            ContractState::Init => 0,
            ContractState::Got1 => 1,
            ContractState::Done => 2
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, Default, Eq)]
pub struct Millionaire {
    name: String,
    worth: u64
}

impl Millionaire {
    /// Constructor function. Takes input parameters and initializes a struct containing both
    /// those items
    pub fn new(name: String, worth: u64) -> Millionaire {
        return Millionaire {
            name,
            worth
        }
    }

    /// Viewer function to read the private member of the Millionaire struct.
    /// We could make the member public instead and access it directly if we wanted to simplify
    /// access patterns
    pub fn name(&self) -> &String {
        &self.name
    }
}

impl PartialOrd for Millionaire {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Millionaire {
    fn cmp(&self, other: &Self) -> Ordering {
        self.worth.cmp(&other.worth)
    }
}

impl PartialEq for Millionaire {
    fn eq(&self, other: &Self) -> bool {
        self.worth == other.worth
    }
}

pub fn config(storage: &mut dyn Storage) -> Singleton<State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read(storage: &dyn Storage) -> ReadonlySingleton<State> {
    singleton_read(storage, CONFIG_KEY)
}
