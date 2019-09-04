<?php

namespace App\Form\DataTransformer;

use App\Entity\Album;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class AlbumToHashTransformer implements DataTransformerInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * Transforms an object to a string
     *
     * @param  Album|null $album
     * @return string
     */
    public function transform($album)
    {
        if (null === $album) {
            return '';
        }

        return $album->getId();
    }

    /**
     * Transforms a string (hash) to an object (album).
     *
     * @param  string $albumHash
     * @return Album|null
     * @throws TransformationFailedException if object (album) is not found.
     */
    public function reverseTransform($albumHash)
    {
        if (!$albumHash) {
            return;
        }

        $album = $this->em
            ->getRepository(Album::class)
            ->findOneBy(['hash' => $albumHash])
        ;

        if (null === $album) {
            throw new TransformationFailedException(sprintf(
                'An album with hash "%s" does not exist!',
                $albumHash
            ));
        }

        return $album;
    }
}
