import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pending";

  constructor(public alertController: AlertController, public taskService: TaskService, public toastController: ToastController, public popoverController: PopoverController ) {

  }


  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Adcionar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa'
        },

        {
          name: 'date',
          type: 'date',
          min: '2021-10-21',
          max: '2025-12-31'
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "") {
              this.taskService.addTask(alertData.task, alertData.date);
            }else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertPromptUpdate(index: number, task) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Atualizar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.value
        },

        {
          name: 'date',
          type: 'date',
          min: '2021-10-21',
          max: '2025-12-31',
          value: task.date.getFullYear() + "-" + ((task.date.getMonth()+1) < 10 ? "0" + task.date.getMonth()+1 : task.date.
          getMonth()+1) + "-" + ((task.date.getDay()+1) < 10 ? "0" + task.date.getDay() : task.date.getMonth())
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "") {
              this.taskService.updateTask(index, alertData.task, alertData.date )
            }else {
              this.presentToast();
              this.taskService.updateTask(index, alertData.task, alertData.date)
            }

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Excluir Tarefa!',
      message: 'Deseja realmente excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Excluir',
          handler: () => this.taskService.delTask(index)
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Preencha a tarefa",
      duration: 2000
    })
    toast.present();
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  cally(ph) {
    window.open('https://api.whatsapp.com/send?phone=' + ph);
  }

}

