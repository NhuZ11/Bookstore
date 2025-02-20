from django.urls import path, include
from .views import BookListCreate, BookDetailUpdateDelete

urlpatterns = [
    path("books/", BookListCreate.as_view(), name="book-list"),
    path("books/<int:pk>/delete/", BookDetailUpdateDelete.as_view(), name="book-detail-delete"),
    path("books/<int:pk>/update/", BookDetailUpdateDelete.as_view(), name="book-detail-update"),
    path("books/<int:pk>/", BookDetailUpdateDelete.as_view(), name="book-detail-view-specific"),
]
