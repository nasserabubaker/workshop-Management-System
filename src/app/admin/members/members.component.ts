import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { AuthService } from 'src/app/services/auth.service';
import { MembersService } from 'src/app/services/members.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private authservice:AuthService ,   private route:Router,private memberserves: MembersService) { }
  members: Array<Member>;
  membertoEdit: Member;
  update: boolean = false;
  neMem: boolean = false;
  username = new FormControl();
  password = new FormControl();
  fullname = new FormControl();
  phone = new FormControl();
  address = new FormControl();
  state = new FormControl();
  ngOnInit(): void {
    this.authservice.userstate().subscribe(x => {
      if (x != "admin") {
        this.route.navigateByUrl('/home');
      }
    });
    this.memberserves.getAllMembers().subscribe(x => this.members = x);
  }
  deleteMember(memberid) {
    if (confirm('هل انت متاكد من حذف الزبون؟')) {
      let obj = {
        id: memberid
      }
      this.memberserves.deleteMember(obj).subscribe();
      window.location.reload();
    }
    } 

  showUpdate(memberid) {
    if (this.update ) {
      this.update = false;
    }
    else {
      this.update = true;
      this.neMem = false;

    }
    for (let mem of this.members){
      if (mem.UserId == memberid) {
        this.membertoEdit = mem;
        break;
      }
    }
    this.username.setValue(this.membertoEdit.Username);
    this.fullname.setValue(this.membertoEdit.FullName);
    this.phone.setValue(this.membertoEdit.phone);
    this.address.setValue(this.membertoEdit.Address);
    this.state.setValue(this.membertoEdit.GroubID);
  }
  doUpdate() {
    let oldname = this.membertoEdit.Username;
    this.membertoEdit.Username = this.username.value;
    if (this.password.value != null) {
      this.membertoEdit.password = this.password.value;

    }
    else {
      this.membertoEdit.password = this.membertoEdit.password;

    }
    this.membertoEdit.FullName = this.fullname.value;
    this.membertoEdit.phone = this.phone.value;
    this.membertoEdit.Address = this.address.value;
    this.membertoEdit.GroubID = this.state.value;
    
    let obj = {
      UserName: this.membertoEdit.Username
    }
    this.memberserves.checkUserName(obj).subscribe(x => {
      if (x.toString().length == 0 || x[0].Username ==oldname ) {
        this.continueUpdate();
      } else
      {
        console.log(x);
        alert("اسم المستخدم موجود مسبقا");
        return;
      }

    });



  }
  continueUpdate() {
      this.memberserves.editMember(this.membertoEdit).subscribe();
      this.update = false;
  }
  showNew() {

    if (this.neMem ) {
      this.neMem = false;

    }
    else {
      this.neMem = true;
      this.update = false;
    }

    this.username.setValue('');
    this.password.setValue('');
    this.fullname.setValue('');
    this.phone.setValue('');
    this.address.setValue('');
  }
  doNew() {
    let name = this.username.value
    let password = this.password.value
    let fullname = this.fullname.value
    let phone = this.phone.value
    let address = this.address.value
    let State = this.state.value
    if (name.length==0) {
      alert("اسم المستخدم فارغ ");
      return;
    }
    else if (password.length==0) {
      alert("كلمة المرور فارغة");
      return;

    }
    else if (fullname.length==0) {
      alert("الاسم الكامل فارغ");
      return;

    }
    else if (phone.length==0) {
      alert("رقم الهاتف فارغ");
      return;

    }
    else if (address.length==0) {
      alert("العنوان فارغ");
      return;

    }
    else if (!State && State.length==0) {

      alert("الحالة فارغة");
      return;

    }
    alert("hi");

    
    let obj = {
      UserName: name
    }
    this.memberserves.checkUserName(obj).subscribe(x => {
      if (x.toString().length == 0) {
        this.continueAdd();
      } else
      {
        alert("اسم المستخدم موجود مسبقا");
        return;
      }

    });

  }
  continueAdd() {
    let name = this.username.value
    let password = this.password.value
    let fullname = this.fullname.value
    let phone = this.phone.value
    let address = this.address.value
    let State = this.state.value
    let obj = {
      Username: name,
      password: password,
      FullName: fullname,
      GroubID: State,
      Address: address,
      phone:phone
    }
    this.memberserves.addNewUser(obj).subscribe(x => this.members = x);
    this.neMem = false;
  }


}

