<?php

class Rate {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // ajout d'une note à un livre
    public function addRate($book_id, $user_id, $rate) {
        if (!$this->isValidRate($rate)) {
            return ['message' => 'Invalid rate value'];
        }
        
        try {
            $sql = "INSERT INTO rates (book_id, user_id, rate) VALUES (:book_id, :user_id, :rate)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':book_id' => $book_id,
                ':user_id' => $user_id,
                ':rate' => $rate,
            ]);
            return ['message' => 'Book rated successfully'];
        } catch (PDOException $e) {
            return ['message' => 'Failed to rate the book: ' . $e->getMessage()];
        }
    }

    // modification de la note sur un livre
    public function updateRate($id, $rate) {
        if (!$this->isValidRate($rate)) {
            return ['message' => 'Invalid rate value'];
        }
        
        try {
            $sql = "UPDATE rates SET rate = ? WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$rate, $id]);
            return ['message' => 'Rate updated successfully'];
        } catch (PDOException $e) {
            return ['message' => 'Failed to update the rate: ' . $e->getMessage()];
        }
    }

    // suppression d'une note sur un livre
    public function removeRate($id) {
        try {
            $sql = "DELETE FROM rates WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$id]);
            return ['message' => 'Rate removed successfully'];
        } catch (PDOException $e) {
            return ['message' => 'Failed to remove the rate: ' . $e->getMessage()];
        }
    }

    // récupération de la note d'un livre en fonction du book_id
    public function getAllByBookId($book_id) {
        try {
            $sql = "SELECT rate FROM rates WHERE book_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$book_id]);
            $rate = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $rate;
        } catch (PDOException $e) {
            return ['message' => 'Failed to get rates: ' . $e->getMessage()];
        }
    }

    // récupération de la note d'un livre en fonction du book_id
    public function getByUserAndBookId($user_id, $book_id) {
        try {
            $sql = "SELECT rate FROM rates WHERE user_id = ? AND book_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$user_id, $book_id]);
            $rate = $stmt->fetch(PDO::FETCH_ASSOC);
            return $rate;
        } catch (PDOException $e) {
            return ['message' => 'Failed to get the rate: ' . $e->getMessage()];
        }
    }

    // vérification de la valeur de rate pour s'assurer qu'elle est comprise entre 0 et 5 inclus
    private function isValidRate($rate) {
        return is_numeric($rate) && $rate >= 0 && $rate <= 5;
    }

}

?>
