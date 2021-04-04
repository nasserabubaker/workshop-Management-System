import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categore.model';
import { Item } from 'src/app/models/item.module';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-adminitems',
  templateUrl: './adminitems.component.html',
  styleUrls: ['./adminitems.component.css']
})
export class AdminitemsComponent implements OnInit {
  filedata: any;
  fileEvent(e){
    this.filedata = e.target.files[0];
  }
  //#region 
  newItem: boolean = false;
  categories: Array<Categorie>
  Itemname = new FormControl('');
  price =  new FormControl('');
  type =  new FormControl('');
  numberOfItems =  new FormControl('');
  descr =  new FormControl('');
  pic =  new FormControl('');
  categore = new FormControl('');
  selectCategories: { id: number, name: string }[]=[];
  red = new FormControl(false);
  green = new FormControl(false);
  blue = new FormControl(false);
  white = new FormControl(false);
  black = new FormControl(false);
  pink = new FormControl(false);
  fuchsia = new FormControl(false);
 gold = new FormControl(false);
  silver = new FormControl(false);
  beige = new FormControl(false); 
  yellow = new FormControl(false); 
  turquoise = new FormControl(false);
  selectColors: { value: string, name: string, controle: FormControl }[];
  colorControls: {controle:FormControl,color:string}[];
  //#endregion
  constructor(private authservice:AuthService ,   private route:Router,private itemserves:ItemsService,private categoriesserves:CategorieServesService,private http:HttpClient) { }
  items:Array<Item>
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.itemserves.getAllItems().subscribe(x => { this.items = x; console.log(this.items)});
    this.categoriesserves.getCategories().subscribe(x => this.categories = x);
    this.colorControls = this.getcolors();
    this.selectColors = this.getSelectedColors();
  }
  showNew() {
    this.categories.forEach(cat => {
      let obj = {
        id: cat.ID,
        name:cat.Name
      }

      this.selectCategories.push(obj);
    });

    if (this.newItem) {
      this.newItem = false;
    }
    else {
      this.newItem = true;
    }
  }
  doNew(f: NgForm) {
    let colors = "";
    let numberofcolors = 0;
    this.colorControls.forEach(element => {
      if (element.controle.value) {
        if (numberofcolors == 0) {
          colors +=  element.color;

        }
        else {
          colors += ' '+  element.color;

        }
        numberofcolors += 1;
      }      
    });
    let itemname = this.Itemname.value
    let categ = this.categore.value
    let pric = this.price.value
    let typee = this.type.value
    let descre = this.descr.value
    let numberOfItemss = this.numberOfItems.value
    let pic = this.pic.value
    pic = pic.split("\\");
    pic = 'photos/' + pic[pic.length - 1];
    let obj = {
      Name: itemname,
      categorie_id: categ,
      Pic: pic,
      Price: pric,
      State: typee,
      NumberOfItems: numberOfItemss,
      descr: descre,
      color_count: numberofcolors,
      colors:colors
    }
    if (itemname.length == 0) {
      alert("اسم القطعة فارغ");
      return;
    }
    if (!categ) {
      alert("اسم التصنيف فارغ");
      return;
    }
    if (pric.length == 0) {
      alert("السعر فارغ");
      return;
    }
    if (!typee) {
      alert("النوع فارغ");
      return;
    }
    if (numberOfItemss.length == 0) {
      alert("عدد القطغ فارغ");
      return;
    }
    if (pic=='photos/') {
      alert("لم ترفق صورة");
      return;
    }
    this.itemserves.addItem(obj).subscribe(x => this.items = x);
    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      /* Image Post Request */
      this.http.post('http://localhost/save.php', myFormData, {
      headers: headers
      }).subscribe(data => {
       //Check success message
       console.log(data);
      });
    this.newItem = false;
  }
 


  //#region colors
 getcolors() {
  return  [
    {
      controle: this.red,
      color: 'red'
    },
    {
      controle: this.green,
      color: 'green'
    },
    {
      controle: this.blue,
      color: 'blue'
    },
    {
      controle: this.white,
      color: 'white'
    },
    {
      controle: this.black,
      color: 'black'
    },
    {
      controle: this.pink,
      color: 'pink'
    },
    {
      controle: this.fuchsia,
      color: 'fuchsia'
    },
    {
      controle: this.gold,
      color: 'gold'
    },
    {
      controle: this.silver,
      color: 'silver'
    },
    {
      controle: this.beige,
      color: 'beige'
    },
    {
      controle: this.yellow,
      color: 'yellow'
    },
    {
      controle: this.turquoise,
      color: 'turquoise'
    }
  ]
}

  getSelectedColors() {
   return  [
      {
        value: 'red',
        name: 'احمر',
        controle: this.red
      },
      {
        value: 'green',
        name:'اخضر',
        controle: this.green
      },
      {
        value: 'blue',
        name:'ازرق',
        controle: this.blue
      },
      {
        value: 'white',
        name:'ابيض',
        controle: this.white
      },
      {
        value: 'black',
        name:'اسود',
        controle: this.black
      },
      {
        value: 'pink',
        name:'زهري',
        controle: this.pink
      },
      {
        value: 'fuchsia',
        name:'فوشي',
        controle: this.fuchsia
      },
      {
        value: 'gold',
        name:'ذهبي',
        controle: this.gold
      },
      {
        value: 'silver',
        name:'فضي',
        controle: this.silver
      },
      {
        value: 'beige',
        name:'بيج',
        controle: this.beige
      },
  
      {
        value: 'yellow',
        name:'اصفر',
        controle: this.yellow
      },
      {
        value: 'turquoise',
        name:'تركواز',
        controle: this.turquoise
      }
  
    ];
  }
  //#endregion

}


