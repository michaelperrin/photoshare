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
     * @Route("/{hash}", name="pictures", methods={"GET"})
     */
    public function index(
        AlbumRepository $albumRepository,
        SerializerInterface $serializer,
        string $hash
    ): JsonResponse {
        $album = $albumRepository->findOneByHashWithPictures($hash);

        if (!$album) {
            throw new NotFoundHttpException('Album not found');
        }

        $json = $serializer->serialize(
            $album,
            'json',
            ['groups' => 'api_pictures_list']
        );

        return new JsonResponse($json, 200, [], true);
    }
}
