import * as SQLite from "expo-sqlite";

const Database = SQLite.openDatabase("gratitudeJournal.db");

export default Database;
