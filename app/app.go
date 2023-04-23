package main

import (
	"context"
    "fmt"
    "os/exec"
	"io"
    "os"
    "strings"
	"bufio"
	// "log"
    "time"
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

func (a *App) Bitacora(opcion int)string{
	respuesta:= ""
	if(opcion==1){
		password := "Audrie8a"
		findCmd := fmt.Sprintf("echo '%s' | sudo -S -p '' find /media/audrie/'Audrie USB' -type f -printf '\"%%Tc %%p\\n\"' | sort -r", password)
		cmd := exec.Command("bash", "-c", findCmd)

		//Obtener listado Actual
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(string(output))
			return " Error Lectura 1"
		}

		//Obtener listado anterior
		fileRead, err := os.Open("bitacora.txt")
		if err != nil {
			// log.Fatal(err)
			return "Error Lectura"+ err.Error()
		}
		defer fileRead.Close()

		// Crear el scanner
		scanner := bufio.NewScanner(fileRead)

		
		palabras:= strings.Split(string(output),"\n")
		contador:= 0

		lines2:= []string{}
		for scanner.Scan(){
			lines2 = append(lines2,scanner.Text())
		}
		
		imprimir:=""

		if(len(palabras)-1 > len(lines2)){
			for i:=0; i<len(palabras)-1; i++{
				if(contador<len(lines2)){
					if(palabras[i]!=lines2[contador] && (lines2[contador]!="\"\n"|| palabras[i]!="\"\n")){
						fmt.Println("##################  CAMBIO REGISTRADO ##################  Agregado")
						fmt.Println("Se encontró: "+palabras[i])
						fmt.Println("Se esperaba: "+lines2[contador])
						fmt.Println("########################################################")
						imprimir+="##################  CAMBIO REGISTRADO ##################  Agregado\n"
						imprimir+="Se encontró: "+palabras[i]+"\n"
						imprimir+="Se esperaba: "+lines2[contador]+"\n"
						imprimir+= "########################################################\n"
						i--
					}else{
						fmt.Println("Estado: Sin Cambios : ------ ",palabras[i])
						imprimir+="Estado: Sin Cambios : ------ "+palabras[i]+"\n"					
					}
					contador++
				}
			}
		}else{
			for i:=0; i<=len(lines2);i++{
				if(contador<len(palabras)-1){
					if(lines2[i]!=palabras[contador] && (lines2[i]!="\"\n"|| palabras[contador]!="\"\n")){
						fmt.Println("##################  CAMBIO REGISTRADO ##################  Eliminado/Movido")
						fmt.Println("Se encontró: "+palabras[contador])
						fmt.Println("Se esperaba: "+lines2[i])
						fmt.Println("########################################################")
						imprimir+="##################  CAMBIO REGISTRADO ##################  Eliminado/Movido\n"
						imprimir+="Se encontró: "+palabras[contador]+"\n"
						imprimir+="Se esperaba: "+lines2[i]+"\n"
						imprimir+= "########################################################\n"
						i--
					}else if(lines2[i]==palabras[contador]){
						fmt.Println("Estado: Sin Cambios 1: ------ ",palabras[contador])
						imprimir+="Estado: Sin Cambios : ------ "+palabras[contador]+"\n"	

						
					}
					contador++
					
				}

			}
		}
		
		
		// LimpiarBitacora()
		respuesta= GenerarImpresion(imprimir)
		GenerarBitacora()	
		Abrir()
	}else if (opcion==2){
		Abrir()
		respuesta="Bitacora Abierta!"
	}else{
		respuesta=LimpiarBitacora()
		
	}
	
	return respuesta


}

func GenerarImpresion(data string) string{
	now := time.Now()
	fmt.Println(now.Format("02/01/2006 15:04:05"))
	imprimir:=  "\n***************** BITACORA *****************  " +now.Format("02/01/2006 15:04:05") +"\n"+ data

	// Crear el archivo
	file, err := os.OpenFile("Bitacora_Publica.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println(err)
		return "Error Bitacora Creación Archivo"
	}
	defer file.Close()

	_, err = fmt.Fprintln(file, imprimir)
	if err != nil {
		fmt.Println(err)
		return "Error Bitacora Escritura"
	}

	fmt.Println("Bitacora Pública Generada!")
	return  "Bitacora Pública Generada!"
}

func LimpiarBitacora() string{
	file, err := os.Create("Bitacora_Publica.txt")
	if err != nil {
		fmt.Println(err)
		return "Error al Limpiar " 
	}
	defer file.Close()

	// Escribir una cadena vacía en el archivo para limpiarlo
	_, err = file.WriteString("")
	if err != nil {
		fmt.Println(err)
		return "Error al Limpiar"
	}

	fmt.Println("Archivo limpiado exitosamente")
	return "Archivo limpiado exitosamente"
}

func GenerarBitacora(){
	password := "Audrie8a"
	findCmd := fmt.Sprintf("echo '%s' | sudo -S -p '' find /media/audrie/'Audrie USB' -type f -printf '\"%%Tc %%p\\n\"' | sort -r", password)
	cmd := exec.Command("bash", "-c", findCmd)

	//Obtener listado Actual
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(string(output))
		return 
	}

	// Crear el archivo
	file, err := os.Create("bitacora.txt")
	if err != nil {
		fmt.Println(err)
		return 
	}
	defer file.Close()

	// Escribir en el archivo
	_, err = file.WriteString(string(output))
	if err != nil {
		fmt.Println(err)
		return 
	}

	fmt.Println("Bitacora Generada!")
}

func Abrir(){
	password := "Audrie8a"
	cmd := exec.Command("xdg-open", "Bitacora_Publica.txt")
	stdin, err := cmd.StdinPipe()
	if err != nil {
		fmt.Println("Error:", err)
		return 
	}
	defer stdin.Close()

	err = cmd.Start()
	if err != nil {
		fmt.Println("Error:", err)
		return 
	}

	io.WriteString(stdin, password+"\n")

	err = cmd.Wait()
	if err != nil {
		fmt.Println("Error:", err)
		return 
	}
	// err := cmd.Run()
	// if err != nil {
	// 	fmt.Println("Error ejecutando el comando:", err)
	// }
}
