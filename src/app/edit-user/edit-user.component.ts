import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  updatedUserName: string = '';
  updatedFirstName: string = '';
  updatedLastName: string = '';
  updatedBirthDay: string = '';
  updatedGender: string = '';
  updatedEmail: string = '';
  updatedPhoneNumber: string = '';
  userId: string = ''

  constructor(private userService: UserService) {}

  ngOnInit() {
  this.userService.getUserProfile().subscribe(
    (response: any) => {
      const user = response.user;
      this.updatedUserName = user.userName;
      this.updatedFirstName = user.firstName;
      this.updatedLastName = user.lastName;
      this.updatedBirthDay = user.birthDay;
      this.updatedGender = user.gender;
      this.updatedEmail = user.email;
      this.updatedPhoneNumber = user.phoneNumber;
      this.userId = user._id; // Set the userId here
    },
    (error: any) => {
      console.error(error);
      alert('Error fetching user data');
    }
  );
}


  onSubmit(userId:string) {
    const userData = {
      userId: this.userId,
      updatedUserName: this.updatedUserName,
      updatedFirstName: this.updatedFirstName,
      updatedLastName: this.updatedLastName,
      updatedBirthDay: this.updatedBirthDay,
      updatedGender: this.updatedGender,
      updatedEmail: this.updatedEmail,
      updatedPhoneNumber: this.updatedPhoneNumber
    };

    this.userService.updateUser(userData).subscribe(
      (response: any) => {
        console.log(response);
        alert('User updated successfully');
      },
      (error: any) => {
        console.error(error);
        alert('Error updating user data');
      }
    );
  }
}
