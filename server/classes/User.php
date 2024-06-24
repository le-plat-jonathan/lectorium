<?php

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create($email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        $sql = "INSERT INTO user (email, password, firstname, lastname, address, zip_code, city, created_at) VALUES (:email, :password, :firstname, :lastname, :address, :zip_code, :city, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':email' => $email,
            ':password' => password_hash($password, PASSWORD_DEFAULT),
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':address' => $address,
            ':zip_code' => $zip_code,
            ':city' => $city
        ]);
        return ['message' => 'User created successfully'];
    }

    public function getById($id) {
        $sql = "SELECT * FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($id, $email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        $sql = "UPDATE user SET email = ?, password = ?, firstname = ?, lastname = ?, address = ?, zip_code = ?, city = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email, password_hash($password, PASSWORD_DEFAULT), $firstname, $lastname, $address, $zip_code, $city, $id]);
        return ['message' => 'User updated successfully'];
    }

    public function delete($id) {
        $sql = "DELETE FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'User deleted successfully'];
    }
}
?>
