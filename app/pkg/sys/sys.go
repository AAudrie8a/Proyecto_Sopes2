package sys

import (
	"math"
	"time"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/wailsapp/wails"

)

type Stats struct {
	log *wails.CustomLogger
}

type CPUUsage struct {
	Average    int `json:"avg"`
	Disk       int `json:"disk"`
	Disk_Free  int `json:"disk_free"`
	Disk_Total int `json:"total_disk"`
	Ram_Free   int `json: ram_free`
	Ram_Used   int `json: ram_used`
	RAM_Total  int `json: ram_total`
}

func (s *Stats) WailsInit(runtime *wails.Runtime) error {
	s.log = runtime.Log.New("Stats")
	return nil
}

func (s *Stats) GetCPUUsage() *CPUUsage {
	percents, err := cpu.Percent(time.Second, false)
	disk_space, err := disk.Usage("/")
	ram, err := mem.VirtualMemory()
	if err != nil {
		s.log.Errorf("unable to get cpu stats: %s", err.Error())
		return nil
	}
	freeSpace := float64(disk_space.Free)
	usedSpace := float64(disk_space.Used)
	totalSpace := float64(disk_space.Total)
	ramFree := float64(ram.Free)
	ramUsed := float64(ram.Used)
	ramTotal := float64(ram.Total)
	
	return &CPUUsage{
		Average:    int(math.Round(percents[0])),
		Disk:       int(math.Round(usedSpace / (1024 * 1024 * 1024))),
		Disk_Free:  int(math.Round(freeSpace / (1024 * 1024 * 1024))),
		Disk_Total: int(math.Round(totalSpace / (1024 * 1024 * 1024))),
		Ram_Free: int(math.Round(ramFree/ (1024 * 1024 * 1024))),
		Ram_Used: int(math.Round(ramUsed/ (1024 * 1024 * 1024))),
		RAM_Total: int(math.Round(ramTotal/ (1024 * 1024 * 1024))),
	}
}


