import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Categorie } from 'src/app/models/categore.model';
import { Item } from 'src/app/models/item.module';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieServesService } from 'src/app/services/categorie-serves.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {
  catname: string = "";
  filedata: any;
  fileEvent(e){
    this.filedata = e.target.files[0];
}
  //#region 
  Itemname= new FormControl('');
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
  @Input('s') itemInfo: Item
  edit: boolean = false;
  constructor(private authservice:AuthService ,private route:Router,private categoreserves:CategorieServesService,private itemserves:ItemsService,private http:HttpClient) { }
  categoresInfo: Array<Categorie>;
  //#endregion
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.categoreserves.getCategories().subscribe(x => this.categoresInfo = x);
    this.colorControls = [
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
    this.selectColors = [
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

  getcategores() {
    this.categoreserves.getCategories().subscribe(x => this.categoresInfo = x);
  }
  findCatName(catid) {

    this.categoresInfo.forEach(cat => {
      if (catid == cat.ID) {
        this.catname = cat.Name;
        return cat.Name;
      }
    });
  }

  showEdit() {
    if (this.edit) {
      this.edit = false;
    }
    else {
      this.edit = true;
      this.Itemname.setValue(this.itemInfo.Name);
      this.price.setValue(this.itemInfo.Price);
      this.type.setValue(this.itemInfo.State);
      this.numberOfItems.setValue(this.itemInfo.NumberOfItems);
      this.descr.setValue(this.itemInfo.descr);
      this.categore.setValue(this.findCatName(this.itemInfo.categorie_id));
    }
    let colors = this.itemInfo.colors.split(" ");
    colors.forEach(element => {
        this.colorControls.forEach(el => {
          if (el.color == element) {
            el.controle.setValue(true);
            }
        });
    });
  }
  doEdit(f: NgForm) {
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
    let itemname = this.Itemname.value;
    let categ = this.categore.value
    let pric = this.price.value
    let typee = this.type.value
    let descre = this.descr.value
    let numberOfItemss = this.numberOfItems.value
    let pic = this.pic.value
    let set = false;
    if (categ == undefined) {
      categ = this.itemInfo.categorie_id;
    }
    if (pic == null || pic.length == 0) {
      pic = this.itemInfo.Pic;
      set = true;

    }
    else {
      pic = pic.split("\\");
      pic = 'photos/' + pic[pic.length - 1];
    }


    if (itemname.length == 0) {
      alert("اسم القطعة فارغ");
      return;
    }
    if (pric.length == 0) {
      alert("السعر فارغ");
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

    let obj = {
      ID: this.itemInfo.ID,
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
    console.log(colors);
    console.log(obj);
    this.itemserves.updateItem(obj).subscribe();

    if (set) {
      this.edit = false;
      window.location.reload();
    }
    else {
      //save image to assets
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
        this.edit = false;
    }
  }


  edit_visible() {
    let obj = {
      "id": this.itemInfo.ID
    }
    this.itemserves.changevisible(obj).subscribe(x => this.itemInfo = x[0]);

    if (this.itemInfo.visible == 0) {
      alert("تم اظهار التصنيف");

    }
    else {
      alert("تم اخفاء التصنيف");

    }
  }
  delete_Item() {
    let obj = {
      "id": this.itemInfo.ID
    }
    this.itemserves.deleteCategore(obj).subscribe();
    alert("تم حذف البضاعة");
    window.location.reload();

  }
}
