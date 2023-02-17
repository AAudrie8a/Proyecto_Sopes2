export namespace sys {
	
	export class CPUUsage {
	    avg: number;
	    disk: number;
	    disk_free: number;
	    total_disk: number;
	
	    static createFrom(source: any = {}) {
	        return new CPUUsage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.avg = source["avg"];
	        this.disk = source["disk"];
	        this.disk_free = source["disk_free"];
	        this.total_disk = source["total_disk"];
	    }
	}

}

