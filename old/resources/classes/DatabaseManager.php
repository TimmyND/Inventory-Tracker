<?php

// Load env file
$_ENV = parse_ini_file("C:\Users\Timmy\OneDrive\Desktop\Personal Projects\Inventory-Tracker\.env");

// Singleton pattern
class DatabaseManager {
	private static $instance;
	private $db;
	
	// Make constructor private to prevent instantiation
	private function __constructor() {}
	function __destruct() {
		//self::getDatabase()->close();
        $this->db = null;
	}
	
	// Returns an instance of the DatabaseManager class
	public static function getInstance() {
		if (self::$instance == null) {
			$className = __CLASS__;
			self::$instance = new $className();
		}
		
		return self::$instance;
	}
	
	// Returns the database connection
	public static function getDatabase() {
		$instance = self::getInstance();
		if ($instance->db == null) {
            $dsn = "pgsql:host=". $_ENV['DB_HOST']. ';port='. $_ENV['DB_PORT']. ';dbname='. $_ENV['DB_DATABASE']. ';';
			$instance->db = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);
        }
		
		return $instance->db;
	}
}

?>