<?php

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // inscription d'un utilisateur
    public function create($email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email address');
        }
    
        if ($this->emailExists($email)) {
            return ['message' => 'Email already exists'];
        }
    
        $sql = "INSERT INTO user (email, password, firstname, lastname, address, zip_code, city, created_at) 
                VALUES (:email, :password, :firstname, :lastname, :address, :zip_code, :city, NOW())";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':email' => $email,
            ':password' => password_hash($password, PASSWORD_DEFAULT),
            ':firstname' => htmlspecialchars($firstname, ENT_QUOTES, 'UTF-8'),
            ':lastname' => htmlspecialchars($lastname, ENT_QUOTES, 'UTF-8'),
            ':address' => htmlspecialchars($address, ENT_QUOTES, 'UTF-8'),
            ':zip_code' => htmlspecialchars($zip_code, ENT_QUOTES, 'UTF-8'),
            ':city' => htmlspecialchars($city, ENT_QUOTES, 'UTF-8')
        ]);
        return ['message' => 'User created successfully'];
    }

    // fonction pour vérifier à l'inscription ou à la modification des infos si le mail existe déjà dans la BDD
    private function emailExists($email) {
        $sql = "SELECT COUNT(*) FROM user WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    }

    // récupération des données d'un utilisateur par son id
    public function getById($id) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }

        $sql = "SELECT * FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // mise à jour des données d'un utilisateur
    public function update($id, $email, $password, $firstname, $lastname, $address, $zip_code, $city) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email address');
        }
    
        if ($this->emailExists($email, $id)) {
            return ['message' => 'Email already exists'];
        }
    
        $sql = "UPDATE user SET email = ?, password = ?, firstname = ?, lastname = ?, address = ?, zip_code = ?, city = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $email, 
            password_hash($password, PASSWORD_DEFAULT), 
            htmlspecialchars($firstname, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($lastname, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($address, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($zip_code, ENT_QUOTES, 'UTF-8'), 
            htmlspecialchars($city, ENT_QUOTES, 'UTF-8'), 
            $id
        ]);
        return ['message' => 'User updated successfully'];
    }
    
    // suppression d'un compte utilisateur
    public function delete($id) {
        if (!ctype_digit($id)) {
            throw new InvalidArgumentException('Invalid ID');
        }

        $sql = "DELETE FROM user WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return ['message' => 'User deleted successfully'];
    }

    // connexion d'un utilisateur
    public function login($email, $password) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email address');
        }

        $sql = "SELECT id, firstname, lastname, password FROM user WHERE email = :email LIMIT 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                return ["id" => $row['id'], "firstname" => $row['firstname'], "lastname" => $row['lastname']];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
