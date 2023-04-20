package main

import (
	"context"
    "fmt"
    "os/exec"
	"io"
    // "strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(estado bool) string {
	password := "Audrie8a"
	if(estado){
		cmd := exec.Command("sudo", "-S", "chmod", "777", "/media")

		stdin, err := cmd.StdinPipe()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}
		defer stdin.Close()

		err = cmd.Start()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}

		io.WriteString(stdin, password+"\n")

		err = cmd.Wait()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}
		return fmt.Sprintf("Desbloqueado")
	} else{
		cmd := exec.Command("sudo", "-S", "chmod", "000", "/media")

		stdin, err := cmd.StdinPipe()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}
		defer stdin.Close()

		err = cmd.Start()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}

		io.WriteString(stdin, password+"\n")

		err = cmd.Wait()
		if err != nil {
			fmt.Println("Error:", err)
			return " "
		}
		return fmt.Sprintf("Bloqueado")

	}

}