# -*- coding:utf-8 -*-
## Adrien Vernotte
## Generates pizzas img

import os, shutil
    
a=open("list.txt")
listPiz = a.readlines()
a.close()

def copy_rename(old_file_name, new_file_name):
        src_dir= os.curdir
        dst_dir= os.path.join(os.curdir , "img")
        src_file = os.path.join(src_dir, old_file_name)
        shutil.copy(src_file,dst_dir)
        
        dst_file = os.path.join(dst_dir, old_file_name)
        new_dst_file_name = os.path.join(dst_dir, new_file_name)
        os.rename(dst_file, new_dst_file_name)

def getNameWithoutAccents(name):
        codecs=["utf-8","ISO-8859-15","utf-16",""]
        for codec in codecs:
            try:
                name=name.decode(codec)
                if (name == u"Américaine"):
                    return "Americaine"
                if (name == u"Câpre"):
                    return "Capre"
                if (name == u"Loïcienne"):
                    return "Loicienne"
                if (name == u"Pissaladière"):
                    return "Pissaladiere"
                if (name == u"Royale Suprême"):
                    return "Royale Supreme"
                if (name == u"Spéciale"):
                    return "Speciale"
                break
            except:
                pass
        return name

for pizza in listPiz:
    pizza = pizza.split("\n")[0]
    pizzaNorm = getNameWithoutAccents(pizza)
    try:
        copy_rename("label.jpg", pizzaNorm+"-label.jpg")
        copy_rename("img.jpg", pizzaNorm+".jpg")
    except Exception, e:
        print pizza, e


    
