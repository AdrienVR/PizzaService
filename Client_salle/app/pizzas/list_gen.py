# -*- coding:utf-8 -*-
## Adrien Vernotte
## Generates the pizza list JSON file for all pizza

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
    
a=open("list.txt")
listPiz = a.readlines()
a.close()

a = open("caca.json","w")
a.write("""[
""")

for pizza in listPiz:
    pizzaNorm = pizza.split("\n")[0]
    pizzaNorm = getNameWithoutAccents(pizzaNorm)
    b = open(pizzaNorm+".json")
    lines = b.readlines()
    b.close()
    for i in lines:
            if i == lines[-1]:
                    a.write(i.strip())
            else:
                    a.write(i)
    if pizza != listPiz[-1]:
            a.write(",\n")

a.write("""
]
""")
a.close()


    
