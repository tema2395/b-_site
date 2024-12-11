package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

const BOTTOKEN = "7560765598:AAFA0LuSbDSOQZKmh7GoQakzoaUBDWbebTo"
const GROUPID = "-1002411690026"

func main() {
	if err := startHTTP(); err != nil {
		log.Fatal("failed to start HTTP:", err)
	}
}

// TestData тест
type TestData struct {
	BusinessForm            string `json:"business_form"`             // Форма бизнеса
	FormOfTaxation          string `json:"form_of_taxation"`          // Форма налогообложения
	AssistanceToBuchalteria string `json:"assistance_to_buchalteria"` // Помощь в бугалтерии
	Name                    string `json:"name"`                      // Имя
	PhoneNumber             string `json:"phone_number"`              // Номер телефона
	Comment                 string `json:"comment"`                   // Комментарий
}

// Application заявка
type Application struct {
	Name        string `json:"name"`         // Имя
	Email       string `json:"email"`        // Почта
	PhoneNumber string `json:"phone_number"` // Номер телефона
	Comment     string `json:"comment"`      // Комментарий
	Type        string `json:"type"`         // Тип
}

func submitTestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var tData TestData
	if err := json.NewDecoder(r.Body).Decode(&tData); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	if err := sendMessageTestToGroup(&tData); err != nil {
		http.Error(w, "Failed to send message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func submitConsultationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var tData Application
	if err := json.NewDecoder(r.Body).Decode(&tData); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	fmt.Println(tData)

	if err := sendMessageConsultationToGroup(&tData); err != nil {
		http.Error(w, "Failed to send message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func sendMessageTestToGroup(msg *TestData) error {
	//botToken := "YOUR_BOT_TOKEN"
	//groupID := "YOUR_GROUP_ID"
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", BOTTOKEN)

	m := map[string]interface{}{
		"chat_id": GROUPID,
		"text": fmt.Sprintf("🔔 Новый тест\n\nФорма бизнеса: %s\nФорма налогообложения: %s\nНужна ли помощь в выборе системы налогообложения  и бухгалтерии: %s\n\nИмя: %s\nНомер телефона: %s\nКомментарий: %s",
			msg.BusinessForm, msg.FormOfTaxation, msg.AssistanceToBuchalteria, msg.Name, msg.PhoneNumber, msg.Comment),
	}

	msgJSON, err := json.Marshal(m)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(msgJSON))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to send message, status code: %d", resp.StatusCode)
	}

	return nil
}

func sendMessageConsultationToGroup(msg *Application) error {
	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", BOTTOKEN)

	m := map[string]interface{}{
		"chat_id": GROUPID,
		"text": fmt.Sprintf("🔔 Новая консультация\n\nИмя: %s\nEmail: %s\nНомер телефона: %s\nКомментарий: %s\nТип: %s",
			msg.Name, msg.Email, msg.PhoneNumber, msg.Comment, msg.Type),
	}

	msgJSON, err := json.Marshal(m)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(msgJSON))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to send message, status code: %d", resp.StatusCode)
	}

	return nil
}

func startHTTP() error {
	fs := http.FileServer(http.Dir("/home/blyqq/businessplus/business/assets"))

	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "/home/blyqq/businessplus/business/index.html")
	})

	http.HandleFunc("/policy", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "/home/blyqq/businessplus/business/policy.html")
	})

	http.HandleFunc("/api/test", submitTestHandler)
	http.HandleFunc("/api/consultation", submitConsultationHandler)

	port := ":3000"
	log.Printf("Server is running on port %s\n", port)
	return http.ListenAndServe(port, nil)
}
