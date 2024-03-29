<?php

namespace App\Service\Photo;

use App\Entity\Picture;
use League\Flysystem\FilesystemInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Uploader
{
    const PHOTO_PATH = 'photo';

    /**
     * @var FilesystemInterface
     */
    private $photoStorage;

    public function __construct(FilesystemInterface $photoStorage)
    {
        $this->photoStorage = $photoStorage;
    }

    public function uploadPhoto(UploadedFile $file): string
    {
        $filename = $this->transferToStorage($file);

        return $filename;
    }

    protected function transferToStorage(UploadedFile $file): string
    {
        $newFilename = uniqid('photo-') . '.' . $file->guessExtension();

        $stream = fopen($file->getPathname(), 'r');

        $this->photoStorage->writeStream(
            self::PHOTO_PATH . '/' . $newFilename,
            $stream
        );

        return $newFilename;
    }
}
