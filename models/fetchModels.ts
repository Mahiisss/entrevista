interface fetchModel{
    collection:string;
    database:string;
    filter:any;
    projection:any;
    all:boolean;
}

export default fetchModel;