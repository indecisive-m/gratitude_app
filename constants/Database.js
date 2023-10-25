import * as SQLite from "expo-sqlite";

const Database = SQLite.openDatabase("gratitudeEntries.db");

export default Database;
