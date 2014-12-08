# -*- coding:utf-8 -*-
## Adrien Vernotte
## Generates pizzas JSON file for each pizza
## from list.TXT and pizzas.JSON

pizzas = open("pizzas.json")
piz = pizzas.readlines()
pizzas.close()

text = """{
"description": 
"comment": 
"id": 
"img": "pizzas/img/
"label": "pizzas/img/
"name": 
"price": 
}"""


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

def getDescription(name):
    x = 0
    for i in range(len(piz)):
        if len(piz[i].split('"name": "'))<2:continue
        if piz[i].split('"name": "')[1][:-2]==name:
            x = i
            break
    return piz[i-3].split('"description": "')[1][:-3]

def getResult(ide, name, nameNorm):
    if ide in ["{","}"]:
        return ""
    if ide == '"note": ':
        return '"5/5",'
    if ide in ['"price": ','"brewery": ']:
        return '"",'
    if ide == '"description": ':
        return '"'+getDescription(name)+'",'
    if ide == '"id": ':
        return '"'+nameNorm+'",'
    if ide == '"name": ':
        return '"'+name+'",'
    if ide == '"img": "pizzas/img/':
        return nameNorm+'.jpg",'
    if ide == '"label": "pizzas/img/':
        return nameNorm + '-label.jpg",'
    if ide == '"comment": ':
        return '"",'
    if ide == '"price": ':
        return '"'+"12"+'"'
    print "err",name,ide
    return '"",'
    
    
a=open("list.txt")
listPiz = a.readlines()
a.close()

for pizza in listPiz:
    pizza = pizza.split("\n")[0]
    pizzaNorm = getNameWithoutAccents(pizza)
    a = open(pizzaNorm+".json","w")
    for x in text.split("\n"):
        a.write(x+getResult(x,pizza, pizzaNorm)+'\n')
    a.close()


    
