import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;

  surnamePattern: string | RegExp = '^([A-ZŻŹĆĄŚĘŁÓŃ])([a-zżźćńółęąś]{2,15})([-]?([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]{2,15}))?$';
  firstNamePattern: string | RegExp = '^[A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćńółęąś]{2,15}$';
  phoneNumberPattern: string | RegExp = '^[0-9]{9}$';

  PhoneNumber = document.getElementById('PhoneNumber');

  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService, private router: Router) { }

  ngOnInit() {
    this.buildContactForm();
  }

  private buildContactForm() {
    this.contactForm = new FormGroup({
      surname: new FormControl('', [Validators.required, Validators.pattern(this.surnamePattern)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(this.firstNamePattern)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumberPattern)]),
    });
}

    validContact() {
      if (!this.contactForm.get('surname').valid) {
        document.getElementById('Surname').style.display = 'block';
      }
      if (!this.contactForm.get('firstName').valid) {
        document.getElementById('FirstName').style.display = 'block';
      }
      if (!this.contactForm.get('phoneNumber').valid) {
        document.getElementById('PhoneNumber').style.display = 'block';
      }
      if (this.contactForm.get('surname').valid && this.contactForm.get('firstName').valid && this.contactForm.get('phoneNumber').valid) {
        this.addContact();
      }
    }

    addContact() {
      this.contactsService.addContact(this.contactForm.value).subscribe(() => this.router.navigate(['/contacts']));
    }

  }

