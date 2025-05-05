package assets

import (
	"archive/zip"
	"encoding/csv"
	"fmt"
	"io"
	"strings"
)

// Data that makes up a credit
type Credit struct {
	Filename string
	Notes    string
	Authors  []string
	Licenses []string
	URLs     []string
}

// A table with asset credits
type CreditTable struct {
	data map[string]Credit
}

// Make a CreditTable with preloaded values
func NewCreditTable(data map[string]Credit) *CreditTable {
	return &CreditTable{data: data}
}

// Load the table with a credits CSV.ZIP file
func (self *CreditTable) LoadFromCsvZip(zipUri string, csvName string) error {
	zipReader, err := zip.OpenReader(zipUri)
	if err != nil {
		return fmt.Errorf("No se pudo abrir el zip:\n%w", err)
	}
	defer zipReader.Close()

	// Search the zip archive
	var csvFile *zip.File
	for _, f := range zipReader.File {
		if strings.EqualFold(f.Name, csvName) {
			csvFile = f
			break
		}
	}

	if csvFile == nil {
		return fmt.Errorf("No se encontró %s", csvName)
	}

	// Open the file
	file, err := csvFile.Open()
	if err != nil {
		return fmt.Errorf("No se pudo abrir el CSV desde el zip:\n%w", err)
	}
	defer file.Close()

	// Read the CSV
	csvReader := csv.NewReader(file)
	// Header
	header, err := csvReader.Read()
	if err != nil {
		return fmt.Errorf("No se pudo leer el encabezado del CSV:\n%w", err)
	}
	expectedHeader := []string{"filename", "notes", "authors", "licenses", "urls"}
	for i, col := range header {
		header[i] = strings.TrimSpace(strings.ToLower(col))
		if i >= len(expectedHeader) || header[i] != expectedHeader[i] {
			return fmt.Errorf("El encabezado no coincide con el esperado")
		}
	}
	// Body
	for {
		row, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("Error leyendo CSV:\n%w", err)
		}
		credit := Credit{
			Filename: strings.TrimSpace(row[0]),
			Notes:    row[1],
			Authors:  strings.Split(row[2], ","),
			Licenses: strings.Split(row[3], ","),
			URLs:     strings.Split(row[4], ","),
		}

		self.data[credit.Filename] = credit
	}

	return nil
}

// Get the credit object related to a resource's URI
func (self *CreditTable) Get(uri string) *Credit {
	value, ok := self.data[uri]
	if !ok {
		return nil
	}
	return &value
}
