from re import sub
from tkinter import *
from tkinter import messagebox
import requests
import sys


class Account:
    def __init__(self):
        self.filename = 'account.json'

    def verified(self):
        self.info = Tk()
        self.info.title('Complete')
        self.info.resizable(0, 0)
        self.info.iconbitmap("lock.ico")
        self.info.config(bg="#181425")

        Label(self.info, text='    ', bg='#181425').grid(row=0, column=0)
        Label(self.info, text='    ', bg='#181425').grid(row=0, column=3)
        Label(self.info, text='Verified', bg='#181425',
              fg='#00FF21').grid(row=1, column=1)
        Label(self.info, text='    ', bg='#181425').grid(row=2, column=0)
        Label(self.info, text='    ', bg='#181425').grid(row=2, column=3)
        Label(self.info, text="Coded by NightDarkness 2022",
              bg="#181425", fg='#FFFFFF').grid(row=2, column=1)
        self.info.mainloop()

    def failed(self):
        self.info = Tk()
        self.info.title('Failed')
        self.info.resizable(0, 0)
        self.info.iconbitmap("lock.ico")
        self.info.config(bg="#181425")

        Label(self.info, text='    ', bg='#181425').grid(row=0, column=0)
        Label(self.info, text='    ', bg='#181425').grid(row=0, column=3)
        Label(self.info, text='Invalid Account', bg='#181425',
              fg='#FF0044').grid(row=1, column=1)
        Label(self.info, text='    ', bg='#181425').grid(row=3, column=1)
        Label(self.info, text='    ', bg='#181425').grid(row=3, column=3)
        self.info.mainloop()

    def write_file(self):
        file = open(self.filename, 'w')
        file.write('{\n\t"key":"' + self.key.get() +
                   '",\n\t"user":"' + self.username.get() + '"\n}')
        file.close()

    def check_connection(self):
        r = requests.get(
            'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + self.username.get() + '&api_key=' + self.key.get() + '&limit=1&format=json')
        if (r.status_code == 200):
            self.write_file()
            self.verified()
        else:
            self.failed()

    def run(self):

        self.root = Tk()
        self.root.title('Account Mannager')
        self.root.resizable(0, 0)
        self.root.iconbitmap('lock.ico')
        self.root.config(bg='#181425')

        self.username = StringVar()
        self.key = StringVar()

        Label(self.root, text='     ', bg='#181425',
              fg='#FFFFFF').grid(row=0, column=3)
        Label(self.root, text='     ', bg='#181425',
              fg='#FFFFFF').grid(row=5, column=3)
        Label(self.root, text='     ', bg='#181425',
              fg='#FFFFFF').grid(row=1, column=0)
        Label(self.root, text='     ', bg='#181425',
              fg='#FFFFFF').grid(row=1, column=4)

        Label(self.root, text='Username: ', bg='#181425',
              fg='#FFFFFF').grid(row=1, column=1)
        Entry(self.root, textvariable=self.username,
              bg='#494949',  fg='#FFFFFF').grid(row=1, column=2)
        Label(self.root, text='API Key: ', bg='#181425',
              fg='#FFFFFF').grid(row=2, column=1)
        Entry(self.root, textvariable=self.key,
              bg='#494949',  fg='#FFFFFF').grid(row=2, column=2)
        Deploy = Button(self.root, text='Check', command=self.check_connection)
        Deploy.config(cursor='hand2')
        Deploy.grid(row=2, column=3, padx=10)

        self.root.mainloop()


if __name__ == "__main__":
    account = Account()
    account.run()
