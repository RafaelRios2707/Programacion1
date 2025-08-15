#Convertidor
print("**1. Convertidor de números**")
cifra=int(input("Intoduce una cifra decimal para convertir: "))
        #A binario
if cifra >= 0:
        binario = bin(int(cifra))[2:]   
        print("·El número en binario es:", binario)
        #A octal
if cifra >= 0:
        octal = oct(int(cifra))[2:]   
        print("·El número en octal es:", octal)
        #A hexadecimal
if cifra >= 0:
        hexadecimal = hex(int(cifra))[2:]   
        print("·El número en hexadecimal es:", hexadecimal)   
           
#Suma decimal
print("**2. Suma de números binarios**")
num1_decimal = int(input("Introduce un número binario: "), 2)
num2_decimal = int(input("Introduce otro número binario: "), 2)
suma_total_decimal = num1_decimal + num2_decimal
print("·La suma de los números binarios en decimal es:", suma_total_decimal)

#Convertir ,16 a ,2
print("**3. Conversión de hexadecimal a binario**")
num_16=int(input("Introduce un número hexagesimal para convertir a binario: "),16)
print("·El número en binario es:", bin(num_16)[2:])

#Calculadora binaria
print("**4. Calculadora binaria**")
num1_decimal = int(input("Introduce un número binario: "), 2)
num2_decimal = int(input("Introduce otro número binario: "), 2)
print("·La suma de los números binarios en binario es:", bin(num1_decimal + num2_decimal)[2:])
if num1_decimal > num2_decimal:
    resta = num1_decimal - num2_decimal 
else:
    resta = -(num2_decimal - num1_decimal)
print("·La resta de los números binarios en binario es:", bin(resta)[2:])
mult = num1_decimal * num2_decimal
print("·La multiplicación de los números binarios en binario es:", bin(mult)[2:])
if num2_decimal != 0:   
    div = num1_decimal / num2_decimal
    print("·La división de los números binarios en binario es:", bin(int(div))[2:])

#tabla de multiplicar
print("**5. Tabla de multiplicar**")       
tabla = int(input("Introduce un número para ver su tabla de multiplicar: "))
while tabla > 0:
    for i in range(1, 11):
        print(f"{tabla} x {i} = {tabla * i}")
    break

#Numeros pares del 1 al 50
print("**6. Numeros pares del 1 al 50**")
for i in range(2, 51, 2):
    print(i, end=" ") 


#Suma de números primos
print("**7. Suma de números primos hasta el 100**")
suma_primos = 0
for num in range(2, 101):
    es_primo = True
    for i in range(2, num):
        if num % i == 0:
            es_primo = False
            break 
    if es_primo:
        suma_primos += num
print("La suma de los números primos hasta el 100 es:", suma_primos)
