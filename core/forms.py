from django import forms
from django.forms import ModelForm, Form
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Categoria, Producto, Perfil

class ProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'
        widgets = {
                'descripcion' : forms.Textarea(),
                'imagen' : forms.FileInput(attrs={'class': 'd-done'}),
        }
        
        labels = {'nombre': 'Nombre',
                 'descuento_subscriptor': 'Subscriptor(%)',
                 'descuento_oferta': 'Oferta(%)'
        }

class BodegaForm(Form):
    categoria = forms.ModelChoiceField(queryset=Categoria.objects.all(), label='Categoría')
    producto = forms.ModelChoiceField(queryset=Producto.objects.none(), label='Producto')
    cantidad = forms.IntegerField(label='Cantidad')
    class Meta:
        fields = '__all__'

class IngresarForm(Form):
    username = forms.CharField(widget=forms.TextInput(), label="Cuenta")
    password = forms.CharField(widget=forms.PasswordInput(), label="Contraseña")
    class Meta:
        fields = ['username', 'password']

class RegistroUsuarioForm(UserCreationForm):
   class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
            'password1': forms.PasswordInput(attrs={'class': 'form-control'}),
            'password2': forms.PasswordInput(attrs={'class': 'form-control'})
        }
        labels = {
            'email': 'E-mail'
        }

class RegistroPerfilForm(ModelForm):
    class Meta:
        model = Perfil
        fields = ['rut', 'direccion', 'subscrito', 'imagen']
        exclude = ['tipo_usuario']
        widgets = {
            'direccion': forms.TextInput(attrs={'class': 'form-control'}),
            'imagen': forms.FileInput(),
            'rut': forms.TextInput(attrs={'class': 'form-control'}),
        }

class UsuarioForm(ModelForm):
   class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
        }


class PerfilForm(ModelForm):
    class Meta:
        model = Perfil
        fields = '__all__'