export namespace main {
	
	export class FrontMatter {
	    title: string;
	    description?: string;
	    weight?: number;
	    draft: boolean;
	    icon?: string;
	    tags?: string[];
	    date?: string;
	
	    static createFrom(source: any = {}) {
	        return new FrontMatter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.description = source["description"];
	        this.weight = source["weight"];
	        this.draft = source["draft"];
	        this.icon = source["icon"];
	        this.tags = source["tags"];
	        this.date = source["date"];
	    }
	}
	export class Article {
	    path: string;
	    filename: string;
	    section: string;
	    frontMatter: FrontMatter;
	    content: string;
	
	    static createFrom(source: any = {}) {
	        return new Article(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.filename = source["filename"];
	        this.section = source["section"];
	        this.frontMatter = this.convertValues(source["frontMatter"], FrontMatter);
	        this.content = source["content"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Section {
	    name: string;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new Section(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	    }
	}

}

