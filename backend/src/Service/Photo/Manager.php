<?php

namespace App\Service\Photo;

use App\Entity\Picture;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Manager
{
    /**
     * @var Uploader
     */
    protected $uploader;

    /**
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(Uploader $uploader, EntityManagerInterface $em)
    {
        $this->uploader = $uploader;
        $this->em = $em;
    }

    public function create(UploadedFile $file, Picture $picture)
    {
        $filename = $this->uploader->uploadPhoto($file);
        $picture->setFilename($filename);

        $this->persistToDatabase($picture);
    }

    protected function persistToDatabase(Picture $picture)
    {
        $this->em->persist($picture);
        $this->em->flush();
    }
}
