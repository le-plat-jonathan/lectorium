<?php

class Book {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($title, $author, $description, $book_cover, $genres) {
        $sql = "INSERT INTO books (title, author, description, book_cover, genres, created_at) 
                VALUES (:title, :author, :description, :book_cover, :genres, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':title' => htmlspecialchars($title, ENT_QUOTES, 'UTF-8'),
            ':author' => htmlspecialchars($author, ENT_QUOTES, 'UTF-8'),
            ':description' => htmlspecialchars($description, ENT_QUOTES, 'UTF-8'),
            ':book_cover' => htmlspecialchars($book_cover, ENT_QUOTES, 'UTF-8'),
            ':genres' => htmlspecialchars($genres, ENT_QUOTES, 'UTF-8')
        ]);
        return ['message' => 'Book created successfully'];
    }

    public function getById($id) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }

        $sql = "SELECT * FROM books WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $title, $author, $description, $book_cover, $genres) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }

        $sql = "UPDATE books SET title = ?, author = ?, description = ?, book_cover = ?, genres = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            htmlspecialchars($title, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($author, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($description, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($book_cover, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($genres, ENT_QUOTES, 'UTF-8'), 
            $id
        ]);
        return ['message' => 'Book updated successfully'];
    }

    public function delete($id) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }

        $sql = "DELETE FROM books WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'Book deleted successfully'];
    }
}
?>
