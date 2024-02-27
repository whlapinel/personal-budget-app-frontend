package main

import (
	"fmt"
	"log"
	"os"
	"database/sql"
	"github.com/go-sql-driver/mysql"
)

func initializeDB() (*sql.DB) {
	var db *sql.DB
	fmt.Println(os.Getenv("DBUSER"))
	fmt.Println(os.Getenv("DBPASS"))
	cfg := mysql.Config{
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "personal_budget",
		AllowNativePasswords: true,
	}
	// Get a database handle.
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
	return db
}


func getUsers(db *sql.DB) ([]User, error) {
	fmt.Println("Hello, World!")
	rows, err := db.Query("SELECT * FROM users")
	fmt.Println("Query executed!")
	var users []User
	var user User
	if err != nil {
		fmt.Println(err)
	} else {
		for rows.Next() {
			err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email)
			if err != nil {
				fmt.Println(err)
			} else {
				users = append(users, user)
			}
		}
		if err := rows.Err(); err != nil {
			return nil, fmt.Errorf("test(): %v", err)
		}
	}
	return users, nil
}


// func getCategories(db) ([]BudgetCategory, error) {
// 	rows, err := db.Query("SELECT * FROM budget_categories")
// 	var categories []BudgetCategory
// 	var category BudgetCategory
// 	if err != nil {
// 		fmt.Println(err)
// 	} else {
// 		for rows.Next() {
// 			err := rows.Scan(&category.ID, &category.UserID, &category.Name, &category)
// 			if err != nil {
// 				fmt.Println(err)
// 			} else {
// 				categories = append(categories, category)
// 			}
// 		}
// 		if err := rows.Err(); err != nil {
// 			return nil, fmt.Errorf("test(): %v", err)
// 		}
// 		fmt.Println(categories)
// 	}
// 	return categories, nil
// }
