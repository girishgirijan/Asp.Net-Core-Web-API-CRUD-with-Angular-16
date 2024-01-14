import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  list: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) {}

  //Get existing records
  refreshList() {
    this.http.get('http://localhost:5234/api/PaymentDetail').subscribe({
      next: (res) => {
        this.list = res as PaymentDetail[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Insert a new record
  postPaymentDetail() {
    return this.http.post(
      'http://localhost:5234/api/PaymentDetail',
      this.formData
    );
  }

  //Update a record
  putPaymentDetail() {
    return this.http.put(
      'http://localhost:5234/api/PaymentDetail/' +
        this.formData.paymentDetailId,
      this.formData
    );
  }

  //Delete a record
  deletePaymentDetail(id: number) {
    return this.http.delete('http://localhost:5234/api/PaymentDetail/' + id);
  }

  //Clear form
  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }
}
