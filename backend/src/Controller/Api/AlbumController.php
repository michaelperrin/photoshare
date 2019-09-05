<?php

namespace App\Controller\Api;

use App\Repository\AlbumRepository;
use App\Repository\PictureRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/album", name="api_photo_")
 */
class AlbumController
{
    /**
     * @Route("/{hash}/pictures", name="pictures", methods={"GET"})
     */
    public function pictures(
        AlbumRepository $albumRepository,
        PictureRepository $pictureRepository,
        SerializerInterface $serializer,
        string $hash
    ): JsonResponse {
        $album = $albumRepository->findOneBy(['hash' => $hash]);

        if (!$album) {
            throw new NotFoundHttpException('Album not found');
        }

        $pictures = $pictureRepository->findBy(['album' => $album]);

        $json = $serializer->serialize(
            $pictures,
            'json',
            ['groups' => 'api_pictures_list']
        );

        return new JsonResponse($json, 200, [], true);
    }
}
