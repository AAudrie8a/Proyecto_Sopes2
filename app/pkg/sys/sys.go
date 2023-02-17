package sys

import (
	"math"
	"time"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
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
}

func (s *Stats) WailsInit(runtime *wails.Runtime) error {
	s.log = runtime.Log.New("Stats")
	return nil
}

func (s *Stats) GetCPUUsage() *CPUUsage {
	percents, err := cpu.Percent(time.Second, false)
	disk_space, err := disk.Usage("/")
	if err != nil {
		s.log.Errorf("unable to get cpu stats: %s", err.Error())
		return nil
	}
	freeSpace := float64(disk_space.Free)
	usedSpace := float64(disk_space.Used)
	totalSpace := float64(disk_space.Total)
	return &CPUUsage{
		Average:    int(math.Round(percents[0])),
		Disk:       int(math.Round(usedSpace / (1024 * 1024 * 1024))),
		Disk_Free:  int(math.Round(freeSpace / (1024 * 1024 * 1024))),
		Disk_Total: int(math.Round(totalSpace / (1024 * 1024 * 1024))),
	}
}
