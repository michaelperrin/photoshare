<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PictureRepository")
 */
class Picture
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("api_pictures_list")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("api_pictures_list")
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Album", inversedBy="pictures")
     * @ORM\JoinColumn(nullable=false)
     */
    private $album;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("api_pictures_list")
     */
    private $filename;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }
}
