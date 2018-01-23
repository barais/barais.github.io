---
layout: blog-post
title: Quelques explication sur la correction automatique en L1 pour l'UE SPE-INFO2
place: Rennes, France
categories: [teaching, istic, l1, french]
---

Hello très chers étudiants,

Pour corriger les TPs notés (CheckPoint) de cette UE, nous avons décidé d'automatiser pleinement cette correction. 
Cela manque d'humanité mais c'est plus équitable ;).

Pour ce faire, vous avez uploader vos TPs [ici](http://depot-l1miee.irisa.fr/webApps/depotSI2/CP1/).

Mais que ce passe-t-il ensuite?

<!--more-->

Nous avons récupéré un ensemble d'archives. Une partie non négligeable n'a pas respecté les consignes.

- Cas 1: 13(/256) étudiants ont rendu uniquement le fichier Scala
- Cas 2: 3(/256) étudiants ont rendus un fichier .tar.gz au lieu d'un fichier zip. 
- Cas 3: 11(/256) ont rendu un fichier .zip dans la librarie si2.jar. La plupart sans le source scala aussi. 
- Cas 4: 11(/256) ont rendu un fichier .zip par mail. 
- Cas 5: 1/256 n'a pas attendu la fin de l'upload de son fichier sur le serveur 
- Cas 6: Le reste des étudiants a lu la consigne correctement

## Etape 1: Obtenir des archives valides pour tout le monde


### Cas 6
Pour le cas 6, tous les fichiers sont rendus encodés en base64. Pour les décoder, j'ai utilisé le script shell suivant:

```bash

#! /bin/sh
mdkir clean
for f in *.zip
do  
    awk -F"base64," '{print $NF}' $f |  base64 --decode > clean/$f
done

```

### Cas 1

Pour le cas 1, tous les fichiers sont rendus encodés en base64. Pour les décoder, j'ai utilisé le script shell suivant:

```bash
#! /bin/sh
mdkir clean
for f in *.scala
do  
    awk -F"base64," '{print $NF}' $f |  base64 --decode > clean/$f
done
```


Puis  en plaçant le template du projet dans le répertoire CP1. 

```bash
#! /bin/sh
for f in *.scala
do  
    cp $f CP1/src/fr/istic/si2/checkpoint1/main.scala
    export basen=`basename $f .scala`
    echo $basen
    zip -r final/$basen.zip CP1
done
```

### Cas 2

Pour le cas 2, tous les fichiers sont rendus encodés en base64. Pour les décoder et les transformer en fichier zip, j'ai utilisé le script shell suivant:


```bash
#! /bin/sh
for f in *.tar.gz
do  
    awk -F"base64," '{print $NF}' $f |  base64 --decode > clean/$f
    tar2zip clean/$f
done
```

### Cas 3

Pour le cas 3, tous les fichiers sont rendus encodés en base64. Pour les décoder et les intégrer la librarie manquante dans le zip, j'ai utilisé le script shell suivant:

J'ai préalabllement placé la librarie manquante dans le répertoire CP1.

```bash
#! /bin/sh
for f in *.zip
do  
    awk -F"base64," '{print $NF}' $f |  base64 --decode > clean/$f
done
for f in clean/*.zip
do  
    zip -ur $f CP1
done
```



### Cas 4

Pour le cas 4, rien à faire à part galérer à récupérer les archives dans les boîtes mails. 

### Cas 5

Je n'ai rien pu faire pour cet étudiant, l'archive n'était que partiellement chargé sur le serveur, impossible de la décoder et de la décompresser. 


## Etape 2: Automatisation de la correction

Pour automatiser la correction, je décompresse les archives et transforme les projets en projet [maven](https://maven.apache.org/). Maven est un outil de construction automatique. La construction du projet produit des fichiers structurés [XML](https://fr.wikipedia.org/wiki/Extensible_Markup_Language) pour les résultats des erreurs de tests ou les erreurs ScalaStyle. 
Ces fichiers structués sont analysés pour chaque projet afin d'applique le barême suivant pour le CP1 afin d'obtenir une note sur 5. 

```
Tests :
- Pour toutes les fonctions dans { max, estMultiple, xor1, xor2, signe } :
  - test de définition (ex: maxDefined) passe  : + 1 point
  - test de correction (ex: maxNoRTE et maxBlabla) en erreur/echec : malus avec plancher 0. 
        - max (1+4) : -0.2 à chaque test échoué/erreur
        - estMultiple (1+5) : -0.2 à chaque test échoué/erreur
        - xor1 (1+1) : -1 à chaque test échoué/erreur
        - xor2 (1+1) : -1 à chaque test échoué/erreur
        - signe (1+6) : -0.15 à chaque test échoué/erreur
  - timeout : considérer comme un test echoué/erreur.
  - test de définition échoue : + 0 point (ne pas regarder les malus correspondant à cette fonction)
  
Erreurs -- Si présent : 0 en note globale (car le projet ne build pas)
"err(org.scalastyle.scalariform.NullChecker)",
"err(org.scalastyle.scalariform.StructuralTypeChecker)",
"err(org.scalastyle.scalariform.EmptyClassChecker)",
"err(org.scalastyle.scalariform.ClassTypeParameterChecker)",
"err(org.scalastyle.scalariform.LowercasePatternMatchChecker)",
"err(org.scalastyle.scalariform.ImportGroupingChecker)",
"err(org.scalastyle.scalariform.UppercaseLChecker)",
"err(org.scalastyle.scalariform.VarFieldChecker)",
"err(org.scalastyle.scalariform.LowercasePatternMatchChecker)",
"err(org.scalastyle.scalariform.PublicMethodsHaveTypeChecker)",

Warnings -- Importants - Si présent : -1 point en global.
"warn(org.scalastyle.scalariform.ScalaDocChecker)",
"warn(org.scalastyle.scalariform.ReturnChecker)",

Warnings -- Mineurs -- Si présents : -0.5 point en global. 
"warn(org.scalastyle.file.FileTabChecker)",
"warn(org.scalastyle.file.FileLengthChecker)",
"warn(org.scalastyle.scalariform.SpacesAfterPlusChecker)",
"warn(org.scalastyle.scalariform.SpacesBeforePlusChecker)",
"warn(org.scalastyle.file.FileLineLengthChecker)",
"warn(org.scalastyle.scalariform.ClassNamesChecker)",
"warn(org.scalastyle.scalariform.ObjectNamesChecker)",
"warn(org.scalastyle.scalariform.PackageObjectNamesChecker)",
"warn(org.scalastyle.scalariform.ParameterNumberChecker)",
"warn(org.scalastyle.scalariform.NoWhitespaceBeforeLeftBracketChecker)",
"warn(org.scalastyle.scalariform.Nodu la fin de l'upload de son fichier sur le serveur 
- Cas 6: Le reste des étudiants a lu la consigne correctement

## Etape 1: Obtenir des archives WhitespaceAfterLeftBracketChecker)",
"warn(org.scalastyle.scalariform.MethodLengthChecker)",
"warn(org.scalastyle.scalariform.MethodNamesChecker)",
"warn(org.scalastyle.scalariform.MultipleStringLiteralsChecker)",

Warnings -- Moyens -- Ne comptent pas pour le CP1
"warn(org.scalastyle.scalariform.RedundantIfChecker)",
"warn(org.scalastyle.scalariform.SimplifyBooleanExpressionChecker)",

Warnings -- On en tient pas compte (vérifié par les tests)
"warn(org.scalastyle.scalariform.NotImplementedErrorUsage)",

Warnings -- Ne comptent pas, car pas activés normalement dans le si2scalastyle.xml
Donc ne rentrent pas dans le calcul de la note.
"warn(org.scalastyle.file.HeaderMatchesChecker)",
"warn(org.scalastyle.file.WhitespaceEndOfLineChecker)",
"warn(org.scalastyle.scalariform.EqualsHashCodeChecker)",
"err(org.scalastyle.scalariform.IllegalImportsChecker)",
"warn(org.scalastyle.scalariform.MagicNumberChecker)",
"warn(org.scalastyle.scalariform.NoCloneChecker)",
"warn(org.scalastyle.scalariform.NoFinalizeChecker)",
"warn(org.scalastyle.scalariform.CovariantEqualsChecker)",
"warn(org.scalastyle.file.RegexChecker)",
"warn(org.scalastyle.scalariform.NumberOfTypesChecker)",
"warn(org.scalastyle.scalariform.CyclomaticComplexityChecker)",
"warn(org.scalastyle.scalariform.IfBraceChecker)",
"warn(org.scalastyle.scalariform.NumberOfMethodsInTypeChecker)",
"warn(org.scalastyle.file.NewLineAtEofChecker)",
"warn(org.scalastyle.file.NoNewLineAtEofChecker)",
"warn(org.scalastyle.scalariform.WhileChecker)",
"warn(org.scalastyle.scalariform.VarLocalChecker)",
"warn(org.scalastyle.scalariform.TokenChecker)",
"warn(org.scalastyle.scalariform.DeprecatedJavaChecker)",
"warn(org.scalastyle.scalariform.UnderscoreImportChecker)",
```

Le code source de cette tâche est écrite dans un langage qui se nomme le [JavaScript](https://fr.wikipedia.org/wiki/JavaScript). Le code est accessible [ici](https://github.com/barais/spe-info2-correctautomation/blob/master/app1.js). 


Ce script génère un fichier csv en sortie. Pour lier l'ID de l'étudiant à son nom. Nous partons d'un fichier csv contenant les éléments par étudiants que nous convertissons en [json](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) grâce au projet [csvtojson](https://github.com/Keyang/node-csvtojson). Une fois la donnée convertie en format [JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation), il est facile de faire une requête de cette manière dans les données depuis JavaScript. 

```js
var jsonQuery = require('json-query')
var si2 = require('./SI2.json');


//Récupère le nom de l'étudiant
jsonQuery('[NUMERO=17011558]', {
        data: si2
      }).value.NOM;

//Récupère le prénom de l'étudiant
jsonQuery('[NUMERO=17011558]', {
        data: si2
      }).value.PRENOM;
```

## Etape 3: Mise en page de la sortie

Pour générer les fichiers de sorties des notes. J'utilise une bête macro dans excel qui produit un fichier html par groupe en utilisant une feuille de syle [bootsrap](https://getbootstrap.com/)
 
```VB
Sub exec()
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")

    Dim Fileout As Object
    Set Fileout = fso.CreateTextFile("E:\g1.html", True, False)
    Fileout.Write BuildHTMLTable(Range("A1:F38"))
    Fileout.Close


End Sub
' Example function call: =BuildHTMLTable(A1:D5)

Public Function BuildHTMLTable(rng As Range) As String
' Given a Range of Cells, build a Bootstrap HTML table, using the formatting
' specified in the Excel cells. If "header" is specified to equal true, assumes
' the first row in the table is a header row.
    Dim last_r As Long: last_r = rng.Cells(1, 1).Row
    Dim tds As New Collection
    Dim txt As String
    Dim isFirstRow As Boolean: isFirstRow = True
    Dim cell As Range, r As Long
    txt = "<html><head><link href=" & Chr(34)

    txt = txt & "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" & Chr(34) & " rel=" & Chr(34) & "stylesheet" & Chr(34) & " integrity=" & Chr(34) & "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" & Chr(34) & " crossorigin=" & Chr(34) & "anonymous" & Chr(34) & "><script src=" & Chr(34) & "https://code.jquery.com/jquery-3.1.1.slim.min.js" & Chr(34) & " integrity=" & Chr(34) & "sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" & Chr(34) & " crossorigin=" & Chr(34) & "anonymous" & Chr(34) & "></script><script src=" & Chr(34) & "https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" & Chr(34) & " integrity=" & Chr(34) & "sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" & Chr(34) & " crossorigin=" & Chr(34) & "anonymous" & Chr(34) & "></script><script src=" & Chr(34) & "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" & Chr(34) & " integrity=" & Chr(34)
    
    txt = txt & "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" & Chr(34) & " crossorigin=" & Chr(34) & "anonymous" & Chr(34) & "></script>            <script src=" & Chr(34) & "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js" & Chr(34) & " integrity=" & Chr(34) & "sha384-feJI7QwhOS+hwpX2zkaeJQjeiwlhOP+SdQDqhgvvo1DsjtiSQByFdThsxO669S2D" & Chr(34) & " crossorigin=" & Chr(34) & "anonymous" & Chr(34) & "></script></head><body>"


    
    txt = txt & "<table class=" & Chr(34) & _
          "table table-compressed table-striped" & Chr(34) & ">" & vbNewLine
    For Each cell In rng
        r = cell.Row
        If (r <> last_r) Then
            If isFirstRow Then
                txt = txt & vbTab & "<thead>" & vbNewLine & BuildRow(tds, isFirstRow) & vbTab & _
                                    "</thead>" & vbNewLine & vbTab & "<tbody>" & vbNewLine
            Else
                txt = txt & BuildRow(tds, isFirstRow)
            End If
            isFirstRow = False
            Set tds = New Collection
        End If
        tds.Add cell.Text
        last_r = r
    Next
    txt = txt & BuildRow(tds, isFirstRow)
    txt = txt & vbTab & "</tbody>" & vbNewLine & "</table>" & vbNewLine
    txt = txt & "</head></html>"
    BuildHTMLTable = txt
End Function

Private Function BuildRow(tds As Collection, header As Boolean) As String
    ' Build a single HTML row given a collection of tds
    Dim txt As String: txt = vbTab & vbTab & "<tr>"
    Dim start_tag As String, end_tag As String, td As Variant
    If header Then
        start_tag = "<th>"
        end_tag = "</th>"
    Else
        start_tag = "<td>"
        end_tag = "</td>"
    End If
    For Each td In tds
        txt = txt & start_tag & td & end_tag
    Next
    txt = txt & "</tr>" & vbNewLine
    BuildRow = txt
End Function

```